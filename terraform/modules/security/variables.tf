variable "project_name" {
  type        = string
  description = "Project name prefix for resource naming"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
}

variable "vpc_id" {
  type        = string
  description = "ID of the VPC"
}

variable "admin_cidr_blocks" {
  type        = list(string)
  description = "CIDR blocks allowed for SSH and Admin management (e.g. ['YOUR_IP/32'])"
  default     = ["0.0.0.0/0"]
}
