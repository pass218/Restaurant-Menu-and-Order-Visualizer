# ==============================================================================
# EC2 Module: Jenkins CI/CD Controller and Ansible Control Node
# ==============================================================================

# Fetch official latest Ubuntu 22.04 LTS AMI for ap-south-1
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical AWS Account ID

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Key Pair for SSH Access
resource "aws_key_pair" "deployer" {
  key_name   = "${var.project_name}-key"
  public_key = var.public_key

  tags = {
    Name        = "${var.project_name}-key"
    Environment = var.environment
  }
}

# ------------------------------------------------------------------------------
# EC2 Instance: Jenkins Controller & CI/CD Runner
# ------------------------------------------------------------------------------
resource "aws_instance" "jenkins" {
  ami                  = data.aws_ami.ubuntu.id
  instance_type        = var.jenkins_instance_type
  subnet_id            = var.public_subnet_id
  vpc_security_group_ids = [var.jenkins_sg_id]
  key_name             = aws_key_pair.deployer.key_name
  iam_instance_profile = var.jenkins_instance_profile_name

  # Encrypted high-performance root volume
  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  user_data = <<-EOF
              #!/bin/bash
              hostnamectl set-hostname jenkins-controller
              echo "Jenkins host initialized" > /tmp/init.log
              EOF

  tags = {
    Name        = "${var.project_name}-jenkins-server"
    Environment = var.environment
    Role        = "Jenkins"
  }
}

# Dedicated Elastic IP for Jenkins (maintains static webhook endpoint)
resource "aws_eip" "jenkins" {
  instance = aws_instance.jenkins.id
  domain   = "vpc"

  tags = {
    Name        = "${var.project_name}-jenkins-eip"
    Environment = var.environment
  }
}

# ------------------------------------------------------------------------------
# EC2 Instance: Ansible Control Node
# ------------------------------------------------------------------------------
resource "aws_instance" "ansible" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.ansible_instance_type
  subnet_id                   = var.public_subnet_id
  vpc_security_group_ids      = [var.ansible_sg_id]
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  user_data = <<-EOF
              #!/bin/bash
              hostnamectl set-hostname ansible-control-node
              apt-get update -y
              apt-get install -y python3-pip ansible git
              EOF

  tags = {
    Name        = "${var.project_name}-ansible-node"
    Environment = var.environment
    Role        = "Ansible"
  }
}
