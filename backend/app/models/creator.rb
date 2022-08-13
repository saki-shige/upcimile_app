class Creator < ApplicationRecord
  require 'google/apis/youtube_v3'

  def find_channel_info
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.key = ENV['API_KEY']
    response = youtube.list_channels([:snippet, :statistics], id: self.channel_id)
    id = self.id
    image = response.items[0].snippet.thumbnails.medium.url
    channel_title = response.items[0].snippet.title
    subscriber_count = response.items[0].statistics.subscriber_count
    introduction = response.items[0].snippet.description
    creator_info = { id: id, image: { url: image }, channel_title: channel_title, subscriber_count: subscriber_count, introduction: introduction}
  end

  def find_channel_video_info
    creator_videos = []
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.key = ENV['API_KEY']
    # （仮）サンプルデータを作るまで
    # channel_id = self.channel_id
    channel_id = 'UC8oF7jmQsKbMVrCv5LrP32w'
    videos_response = youtube.list_searches(:snippet, channel_id: channel_id, type: 'video', max_results: 4)
    videos_response.items.each do |video|
      introduction = video.snippet.description
      thumbnail = video.snippet.thumbnails.high.url
      title = video.snippet.title
      url = "https://www.youtube.com/watch?v=XkUkZUtLrBI#{video.id.video_id}"
      creator_video = {title: title, thumbnail: thumbnail, introduction: introduction, url: url}
      creator_videos.push(creator_video)
    end
    creator_videos
  end
end
