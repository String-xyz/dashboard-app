resource "aws_s3_bucket" "web_app" {
  bucket = local.web_bucket_name
}

resource "aws_s3_bucket_public_access_block" "web_app" {
  bucket                  = aws_s3_bucket.web_app.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_website_configuration" "app_s3_config" {
  bucket = aws_s3_bucket.web_app.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "app_s3_policy" {
    bucket = aws_s3_bucket.web_app.id
    policy = local.web_policy_config_json
}

# used for redirecting www to non www
resource "aws_s3_bucket" "www_web" {
  bucket = local.www_bucket_name
}

resource "aws_s3_bucket_website_configuration" "ww_s3_config" {
  bucket = aws_s3_bucket.www_web.id
  redirect_all_requests_to {
    host_name = "https://${local.web_domain}"
  }
}

resource "aws_s3_bucket_policy" "ww_s3_policy" {
    bucket = aws_s3_bucket.www_web.id
    policy = local.www_policy_config_json
}

resource "aws_s3_bucket_public_access_block" "www_web_app" {
  bucket                  = aws_s3_bucket.www_web.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
