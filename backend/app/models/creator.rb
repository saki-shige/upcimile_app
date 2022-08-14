class Creator < ApplicationRecord
  require 'google/apis/youtube_v3'

  def self.list_up_all_channel_info
    creators = self.all
    creators_info = []
    creators.each do |creator|
      creators_info.push(creator.find_channel_info) if creator.find_channel_info
    end
    creators_info.empty? ? nil :creators_info
  end

  def find_channel_info
    response = youtube_client.list_channels([:snippet, :statistics], id:self.channel_id)
    # channel_idが間違っている（ex.ユーザーがyoutube上のチャンネルを消去した、変更した)場合はnilを返す。
    # ※list_channelsは存在しないchannel_idを指定した場合,status200と空のitemsを返すため
    if response.items
      id = self.id
      image = response.items[0].snippet.thumbnails.medium.url
      channel_title = response.items[0].snippet.title
      subscriber_count = response.items[0].statistics.subscriber_count
      introduction = response.items[0].snippet.description
      creator_info = { id: id, image: { url: image }, channel_title: channel_title, subscriber_count: subscriber_count, introduction: introduction}
    else
      creator_info = nil
    end
  end

  def find_channel_video_info
    # （仮）サンプルデータを作るまで
    # channel_id = self.channel_id
    channel_id = 'UC8oF7jmQsKbMVrCv5LrP32w'
    videos_response = youtube_client.list_searches(:snippet, channel_id: channel_id, type: 'video', max_results: 4)
    # channel_idが間違っている（ex.ユーザーがyoutube上のチャンネルを消去した、変更した)場合はnilを返す。
    # 　※list_searchesは存在しないchannel_idを指定した場合,status200と空の配列を返す
    # 　※動画を登録していないケースとchannel_idが誤っているケースを分ける
    if videos_response
      creator_videos = []
      videos_response.items.each do |video|
        introduction = video.snippet.description
        thumbnail = video.snippet.thumbnails.high.url
        title = video.snippet.title
        url = "https://www.youtube.com/watch?v=XkUkZUtLrBI#{video.id.video_id}"
        creator_video = {title: title, thumbnail: thumbnail, introduction: introduction, url: url}
        creator_videos.push(creator_video)
      end
      creator_videos
    else
      creator_videos = nil
    end
  end

  def youtube_client
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.key = ENV['API_KEY']
    youtube
  end
end
