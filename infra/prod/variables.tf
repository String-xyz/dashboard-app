locals {
  region            = "us-west-2"
  root_domain       = "dashboard.string.xyz"
  web_origin_id     = "dashboard-web-app"
  web_bucket_name   = "dashboard.string.xyz"
  web_domain        = "dashboard.string.xyz"
  www_web_domain    = "www.dashboard.string.xyz"
  www_bucket_name   = "www.dashboard.string.xyz"
  www_web_origin_id = "www-dashboard-web-app"
  env               = "prod"
}

locals {
  acl = "private"
  web_policy_config_json = jsonencode({
    "Version" : "2008-10-17",
    "Statement" : [
      {
        "Sid" : "AllowPublicRead",
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : "${aws_cloudfront_origin_access_identity.web.iam_arn}"
        },
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::${local.web_bucket_name}/*"
      }
    ]
    }
  )

  www_policy_config_json = jsonencode({
    "Version" : "2008-10-17",
    "Statement" : [
      {
        "Sid" : "AllowPublicRead",
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : "${aws_cloudfront_origin_access_identity.www_web.iam_arn}"
        },
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::${local.www_bucket_name}/*"
      }
    ]
    }
  )
}
