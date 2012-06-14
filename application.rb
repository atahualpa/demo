require 'sinatra'
require 'json'

@@data = {
	:user1 => {:name => 'Joe', :fruit => 'apple'}
}



get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/users' do
  content_type :json
  @@data.to_json
end

post '/users' do
  content_type :json
  message = JSON.parse(request.body.read.to_s)
  @@data << message
  message.to_json
end
