# Terraform Infrastructure Configuration for SAQYN RABT

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

variable "cloudflare_api_token" {
  type        = string;
  description = "Cloudflare API Token with Workers and R2 edit permissions."
}

variable "cloudflare_account_id" {
  type        = string;
}

# 1. Cloudflare R2 Storage Bucket for indexed PDFs
resource "cloudflare_r2_bucket" "knowledge_bucket" {
  account_id = var.cloudflare_account_id
  name       = "saqyn-knowledge-bucket"
  location   = "WEUR" # Western Europe / Gulf adjacent edge caching
}

# 2. Cloudflare Worker for backend APIs
resource "cloudflare_worker_script" "backend_worker" {
  account_id = var.cloudflare_account_id
  name       = "saqyn-backend-worker"
    content    = file("../index.ts")

  r2_bucket_binding {
    name        = "BUCKET"
    bucket_name = cloudflare_r2_bucket.knowledge_bucket.name
  }
}
