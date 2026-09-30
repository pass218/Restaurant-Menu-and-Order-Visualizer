variable "project_name" {
  type        = string
  description = "Project name prefix"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "public_subnet_id" {
  type        = string
  description = "Subnet ID for Jenkins and Ansible public instances"
}

variable "jenkins_sg_id" {
  type        = string
  description = "Security Group ID for Jenkins instance"
}

variable "ansible_sg_id" {
  type        = string
  description = "Security Group ID for Ansible instance"
}

variable "jenkins_instance_type" {
  type        = string
  description = "EC2 instance type for Jenkins"
  default     = "t3.medium"
}

variable "ansible_instance_type" {
  type        = string
  description = "EC2 instance type for Ansible Control Node"
  default     = "t3.small"
}

variable "jenkins_instance_profile_name" {
  type        = string
  description = "IAM Instance Profile Name for Jenkins"
}

variable "public_key" {
  type        = string
  description = "SSH Public Key content for EC2 Key Pair"
}
