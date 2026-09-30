variable "cluster_name" {
  type        = string
  description = "EKS Cluster Name"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "cluster_version" {
  type        = string
  description = "Kubernetes Version for EKS"
  default     = "1.30"
}

variable "eks_cluster_role_arn" {
  type        = string
  description = "IAM Role ARN for EKS Cluster Control Plane"
}

variable "eks_nodegroup_role_arn" {
  type        = string
  description = "IAM Role ARN for EKS Managed Node Group"
}

variable "subnet_ids" {
  type        = list(string)
  description = "Subnet IDs for EKS Cluster VPC configuration (public & private)"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "Private Subnet IDs where worker nodes should be launched"
}

variable "node_instance_types" {
  type        = list(string)
  description = "EC2 instance types for EKS worker nodes"
  default     = ["t3.medium"]
}

variable "desired_size" {
  type        = number
  description = "Desired number of worker nodes"
  default     = 2
}

variable "min_size" {
  type        = number
  description = "Minimum number of worker nodes"
  default     = 2
}

variable "max_size" {
  type        = number
  description = "Maximum number of worker nodes"
  default     = 4
}
