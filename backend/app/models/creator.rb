class Creator < ApplicationRecord
  has_many :offers
  require 'google/apis/youtube_v3'

  def find_channel_info
    response = youtube_client.list_channels(%i[snippet statistics], id: channel_id)
    # channel_idが間違っている（ex.ユーザーがyoutube上のチャンネルを消去した、変更した)場合はnilを返す。
    # ※list_channelsは存在しないchannel_idを指定した場合,status200と空のitemsを返すため
    if response.items
      id = self.id
      image = response.items[0].snippet.thumbnails.medium.url
      channel_title = response.items[0].snippet.title
      subscriber_count = response.items[0].statistics.subscriber_count
      introduction = response.items[0].snippet.description
      creator_info = { id:, image: { url: image }, channel_title:, subscriber_count:,
                       introduction: }
    else
      creator_info = nil
    end
  end

  def find_channel_video_info
    # （仮）サンプルデータを作るまで
    # channel_id = self.channel_id
    channel_id = 'UC8oF7jmQsKbMVrCv5LrP32w'
    videos_response = youtube_client.list_searches(:snippet, channel_id:, type: 'video', max_results: 4)
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
        creator_video = { title:, thumbnail:, introduction:, url: }
        creator_videos.push(creator_video)
      end
      creator_videos
    else
      creator_videos = nil
    end
  end

  def find_my_channel_info(access_token)
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.authorization = access_token
    response = youtube.list_channels([:snippet], mine: true)
  end

  def youtube_client
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.key = ENV.fetch('API_KEY', nil)
    youtube
  end
end
