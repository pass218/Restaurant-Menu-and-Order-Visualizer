# ==============================================================================
# Root Module Variables: Restaurant Menu & Order Visualizer
# Region: AWS ap-south-1
# ==============================================================================

variable "aws_region" {
  type        = string
  description = "Target AWS Region"
  default     = "ap-south-1"
}

variable "project_name" {
  type        = string
  description = "Project name prefix for all AWS resources"
  default     = "restaurant-menu"
}

variable "environment" {
  type        = string
  description = "Target deployment environment"
  default     = "production"
}

variable "vpc_cidr" {
  type        = string
  description = "VPC Classless Inter-Domain Routing (CIDR) block"
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  type        = list(string)
  description = "List of availability zones for multi-AZ high availability"
  default     = ["ap-south-1a", "ap-south-1b"]
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "CIDR blocks for public subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "CIDR blocks for private subnets"
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

variable "cluster_name" {
  type        = string
  description = "Name of the AWS EKS Cluster"
  default     = "restaurant-cluster"
}

variable "cluster_version" {
  type        = string
  description = "Kubernetes control plane version"
  default     = "1.30"
}

variable "jenkins_instance_type" {
  type        = string
  description = "EC2 instance size for Jenkins Controller"
  default     = "t3.medium"
}

variable "ansible_instance_type" {
  type        = string
  description = "EC2 instance size for Ansible Control Node"
  default     = "t3.small"
}

variable "node_instance_types" {
  type        = list(string)
  description = "EC2 instance types for EKS worker node group"
  default     = ["t3.medium"]
}

variable "node_desired_size" {
  type        = number
  description = "Desired number of Kubernetes worker nodes"
  default     = 2
}

variable "node_min_size" {
  type        = number
  description = "Minimum number of Kubernetes worker nodes"
  default     = 2
}

variable "node_max_size" {
  type        = number
  description = "Maximum number of Kubernetes worker nodes"
  default     = 4
}

variable "admin_cidr_blocks" {
  type        = list(string)
  description = "CIDR block permitted to SSH and access administrative ports"
  default     = ["0.0.0.0/0"]
}

variable "ssh_public_key" {
  type        = string
  description = "Public SSH key content (e.g. contents of ~/.ssh/id_rsa.pub) to inject into EC2 instances"
  default     = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGtV+xVbKDevOpsPlaceholderKeyForDemoAccessOnly devops@aws"
}
