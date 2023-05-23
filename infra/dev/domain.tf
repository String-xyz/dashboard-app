data "aws_route53_zone" "default" {
  name = local.root_domain
}

resource "aws_route53_record" "web_app" {
  name    = "dashboard"
  type    = "A"
  zone_id = data.aws_route53_zone.default.zone_id

  alias {
    name                   = aws_cloudfront_distribution.web_app.domain_name
    zone_id                = aws_cloudfront_distribution.web_app.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_web_app" {
  name    = "www.dashboard"
  type    = "A"
  zone_id = data.aws_route53_zone.default.zone_id

  alias {
    name                   = aws_cloudfront_distribution.www_web_app.domain_name
    zone_id                = aws_cloudfront_distribution.www_web_app.hosted_zone_id
    evaluate_target_health = false
  }
}

module "web_app" {
  source      = "git@github.com:String-xyz/terraform-modules.git//acm"
  domain_name = local.web_domain
  aws_region  = "us-east-1"
  zone_id     = data.aws_route53_zone.default.zone_id
  tags = {
    Name        = "${local.env}-web-dashboard-app-certificate"
    Environment = local.env
  }
}

module "www_web_app" {
  source      = "git@github.com:String-xyz/terraform-modules.git//acm"
  domain_name = local.www_web_domain
  aws_region  = "us-east-1"
  zone_id     = data.aws_route53_zone.default.zone_id

  tags = {
    Name        = "${local.env}-www-web-dashboard-app-certificate"
    Environment = local.env
  }
}
