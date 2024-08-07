# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name     = "minimal"
  spec.version  = "0"
  spec.authors  = ["Ruoyu Zhong"]
  spec.email    = ["zhongruoyu@outlook.com"]
  spec.summary  = "A minimalist Jekyll blog theme."
  spec.homepage = "https://github.com/ZhongRuoyu/minimal"
  spec.license  = "MIT"
  spec.metadata = {
    "rubygems_mfa_required" => "true"
  }

  spec.add_dependency "jekyll"
  spec.add_dependency "jekyll-redirect-from"
  spec.add_dependency "jekyll-seo-tag"
  spec.add_dependency "jekyll-sitemap"

  spec.files =
    `git ls-files -z`
    .split("\x0")
    .select do |f|
      f.match?(%r{^(
        _data/|
        _includes/|
        _layouts/|
        _sass/|
        assets/|
        _config\.yml$|
        LICENSE$|
        README\.md$
      )}x)
    end
end
