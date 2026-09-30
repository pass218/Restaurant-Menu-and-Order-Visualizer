# ==============================================================================
# Root Infrastructure Orchestrator: Restaurant Menu & Order Visualizer
# Provider: AWS (ap-south-1)
# ==============================================================================

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
      Region      = var.aws_region
    }
  }
}

# 1. VPC Module: Multi-AZ Subnets, Gateways, Route Tables
module "vpc" {
  source = "./modules/vpc"

  project_name         = var.project_name
  environment          = var.environment
  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  cluster_name         = var.cluster_name
}

# 2. Security Module: Security Groups, IAM Roles & Instance Profiles
module "security" {
  source = "./modules/security"

  project_name      = var.project_name
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  admin_cidr_blocks = var.admin_cidr_blocks
}

# 3. EC2 Module: Jenkins CI/CD Controller & Ansible Control Node
module "ec2" {
  source = "./modules/ec2"

  project_name                  = var.project_name
  environment                   = var.environment
  public_subnet_id              = module.vpc.public_subnet_ids[0]
  jenkins_sg_id                 = module.security.jenkins_sg_id
  ansible_sg_id                 = module.security.ansible_sg_id
  jenkins_instance_type         = var.jenkins_instance_type
  ansible_instance_type         = var.ansible_instance_type
  jenkins_instance_profile_name = module.security.jenkins_instance_profile_name
  public_key                    = var.ssh_public_key
}

# 4. EKS Module: Managed Kubernetes Cluster & Worker Node Group
module "eks" {
  source = "./modules/eks"

  cluster_name         = var.cluster_name
  environment          = var.environment
  cluster_version      = var.cluster_version
  eks_cluster_role_arn = module.security.eks_cluster_role_arn
  eks_nodegroup_role_arn = module.security.eks_nodegroup_role_arn
  subnet_ids           = concat(module.vpc.public_subnet_ids, module.vpc.private_subnet_ids)
  private_subnet_ids   = module.vpc.private_subnet_ids
  node_instance_types  = var.node_instance_types
  desired_size         = var.node_desired_size
  min_size             = var.node_min_size
  max_size             = var.node_max_size
}
