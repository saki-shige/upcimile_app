class Creator < ApplicationRecord
  include CommonScope
  has_many :offers
  validates :name, presence: true, length: { maximum: 30 }
  validates :introduction, length: { maximum: 300 }
  validates :channel_id, presence: true
  require 'google/apis/youtube_v3'

  def channel_info
    channel_info = find_channel_info(channel_id)
    { id:, image: channel_info.snippet.thumbnails.medium.url, name: channel_info.snippet.title,
      subscriber_count: channel_info.statistics.subscriber_count, introduction: channel_info.snippet.description }
  end

  def channel_videos
    channel_videos = find_channel_videos(channel_id)
    creator_videos = []
    channel_videos.items.each do |video|
      introduction = video.snippet.description
      thumbnail = video.snippet.thumbnails.high.url
      title = video.snippet.title
      url = "https://www.youtube.com/watch?v=#{video.id.video_id}"
      creator_video = { title:, thumbnail:, introduction:, url: }
      creator_videos.push(creator_video)
    end
    creator_videos
  end

  def my_channel_info(access_token)
    my_channel_info = find_my_channel_info(access_token)
    creator = self
    creator.channel_id = my_channel_info.id
    creator.name = my_channel_info.snippet.title
    creator.introduction = my_channel_info.snippet.description
    creator.image = my_channel_info.snippet.thumbnails.high.url
    creator
  end

  private

  def find_my_channel_info(access_token)
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.authorization = access_token
    youtube.list_channels([:snippet], mine: true).items[0]
  end

  def find_channel_info(channel_id)
    youtube_client.list_channels(%i[snippet statistics], id: channel_id).items[0]
  end

  def find_channel_videos(channel_id)
    youtube_client.list_searches(:snippet, channel_id:, type: 'video', max_results: 4)
  end

  def youtube_client
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.key = ENV.fetch('API_KEY', nil)
    youtube
  end
end
