# ==============================================================================
# Outputs: Key Infrastructure Endpoints & Connection Commands
# ==============================================================================

output "vpc_id" {
  description = "AWS Virtual Private Cloud ID"
  value       = module.vpc.vpc_id
}

output "nat_gateway_ip" {
  description = "Egress public IP for private EKS worker nodes"
  value       = module.vpc.nat_gateway_ip
}

output "jenkins_public_ip" {
  description = "Static Public IP of Jenkins Controller"
  value       = module.ec2.jenkins_public_ip
}

output "jenkins_web_url" {
  description = "Direct browser URL to access Jenkins Dashboard"
  value       = "http://${module.ec2.jenkins_public_ip}:8080"
}

output "jenkins_ssh_command" {
  description = "SSH command to connect to Jenkins EC2 instance"
  value       = "ssh -i ~/.ssh/id_rsa ubuntu@${module.ec2.jenkins_public_ip}"
}

output "ansible_public_ip" {
  description = "Public IP of Ansible Control Node"
  value       = module.ec2.ansible_public_ip
}

output "ansible_ssh_command" {
  description = "SSH command to connect to Ansible Control Node"
  value       = "ssh -i ~/.ssh/id_rsa ubuntu@${module.ec2.ansible_public_ip}"
}

output "eks_cluster_name" {
  description = "AWS EKS Cluster Name"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "Kubernetes API Server Endpoint"
  value       = module.eks.cluster_endpoint
}

output "configure_kubectl_command" {
  description = "Command to configure local kubectl to authenticate with the EKS cluster"
  value       = "aws eks update-kubeconfig --region ${var.aws_region} --name ${module.eks.cluster_name}"
}

output "key_pair_name" {
  description = "AWS EC2 Key Pair Name"
  value       = module.ec2.key_pair_name
}
