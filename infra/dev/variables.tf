locals {
  region            = "us-west-2"
  root_domain       = "dev.string-api.xyz"
  web_origin_id     = "plaform-web-app"
  web_bucket_name   = "dashboard.dev.string-api.xyz"
  web_domain        = "dashboard.dev.string-api.xyz"
  www_web_domain    = "www.dashboard.dev.string-api.xyz"
  www_bucket_name   = "www.dashboard.dev.string-api.xyz"
  www_web_origin_id = "www-platform-web-app"
  env               = "dev"
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
