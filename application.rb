require 'rubygems'
require 'sinatra'
require 'json'
require 'dm-core'
require 'dm-migrations'
require 'dm-serializer'

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/development.db")

class User

	include	DataMapper::Resource

	property :id, 			Serial
	property :name, 		String
	property :fruit,		String

end

DataMapper.auto_migrate!

# =========
# = Users =
# ========= 

User.create(
	:name    	=> "Aldo Escudero",
	:fruit 		=> "papaya"
	)

User.create(
	:name    	=> "Carlos Lopez",
	:fruit 		=> "melon"
	)



get '/' do
	File.read(File.join('public', 'index.html'))
end

get '/users' do
	content_type :json
	User.all.to_json
end

post '/users' do
	content_type :json
	message = JSON.parse(request.body.read.to_s)
	@@data << message
	message.to_json
end
