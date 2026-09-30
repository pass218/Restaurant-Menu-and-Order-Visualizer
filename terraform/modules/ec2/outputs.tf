output "jenkins_public_ip" {
  description = "Static Public IP of the Jenkins Controller"
  value       = aws_eip.jenkins.public_ip
}

output "jenkins_instance_id" {
  description = "EC2 Instance ID of the Jenkins Controller"
  value       = aws_instance.jenkins.id
}

output "ansible_public_ip" {
  description = "Public IP of the Ansible Control Node"
  value       = aws_instance.ansible.public_ip
}

output "ansible_instance_id" {
  description = "EC2 Instance ID of the Ansible Control Node"
  value       = aws_instance.ansible.id
}

output "key_pair_name" {
  description = "Name of the created Key Pair"
  value       = aws_key_pair.deployer.key_name
}
