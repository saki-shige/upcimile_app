CarrierWave.configure do |config|
  if Rails.env.production?
    config.fog_provider = 'fog/aws'
    config.fog_public = false
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'ap-northeast-1',
      path_style: true
    }
    config.storage = :fog
    config.cache_storage = :fog
    config.asset_host = 'https://uocimilebackend.herokuapp.com/api/v1'
    config.fog_directory = ENV['AWS_BUCKET']
  else
    config.storage :file
    config.cache_storage = :file
    config.asset_host = "http://localhost:3001"
  end
end
