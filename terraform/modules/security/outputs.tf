output "jenkins_sg_id" {
  description = "Security Group ID for Jenkins instance"
  value       = aws_security_group.jenkins.id
}

output "ansible_sg_id" {
  description = "Security Group ID for Ansible instance"
  value       = aws_security_group.ansible.id
}

output "eks_cluster_role_arn" {
  description = "IAM Role ARN for EKS Cluster"
  value       = aws_iam_role.eks_cluster.arn
}

output "eks_nodegroup_role_arn" {
  description = "IAM Role ARN for EKS Managed Node Group"
  value       = aws_iam_role.eks_nodes.arn
}

output "jenkins_instance_profile_name" {
  description = "IAM Instance Profile Name for Jenkins EC2"
  value       = aws_iam_instance_profile.jenkins.name
}
