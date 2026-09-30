# ==============================================================================
# S3 Remote State Backend with DynamoDB State Locking
# Region: AWS ap-south-1
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # NOTE: To use remote state, create the S3 bucket and DynamoDB table first:
  #   aws s3api create-bucket --bucket restaurant-terraform-state-ap-south-1 --region ap-south-1 --create-bucket-configuration LocationConstraint=ap-south-1
  #   aws dynamodb create-table --table-name restaurant-terraform-locks --attribute-definitions AttributeName=LockID,AttributeType=S --key-schema AttributeName=LockID,KeyType=HASH --billing-mode PAY_PER_REQUEST --region ap-south-1
  # Then uncomment the backend block below:

  backend "s3" {
    bucket         = "restaurant-terraform-state-ap-south-1"
    key            = "production/restaurant-app/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "restaurant-terraform-locks"
    encrypt        = true
  }
}
