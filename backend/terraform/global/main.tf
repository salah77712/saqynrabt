# Multi-Region Global Infrastructure Terraform Provisioner

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

variable "cloudflare_account_id" {
  type = string;
}

# 1. Global Multi-region Failover Load Balancer
resource "cloudflare_load_balancer" "global_lb" {
  zone_id          = "zone-id-salah"
  name             = "api.saqynrabt.com"
  fallback_pool_id = cloudflare_load_balancer_pool.eu_pool.id
  default_pool_ids = [
    cloudflare_load_balancer_pool.us_pool.id,
    cloudflare_load_balancer_pool.eu_pool.id
  ]
  description      = "Global load balancer for SAQYN edge APIs"
}

# 2. Regional Pools - US East Edge
resource "cloudflare_load_balancer_pool" "us_pool" {
  account_id = var.cloudflare_account_id
  name       = "us-east-pool"
  origins {
    name    = "saqyn-us-worker"
    address = "saqyn-us.workers.dev"
    enabled = true
  }
}

# 3. Regional Pools - Western Europe Edge
resource "cloudflare_load_balancer_pool" "eu_pool" {
  account_id = var.cloudflare_account_id
  name       = "eu-west-pool"
  origins {
    name    = "saqyn-eu-worker"
    address = "saqyn-eu.workers.dev"
    enabled = true
  }
}
