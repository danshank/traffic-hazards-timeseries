import pymongo
import urllib.request
import json
import time

client = pymongo.MongoClient()
db = client.test

db.drop_collection('serviceCalls')
db.create_collection('serviceCalls')

col = db.serviceCalls

offset = 0
max_requests = 50000
url = '{}resource/wc8w-nujj.json?$limit={}&$offset={}&$$app_token={}'
while True:
	this_request = url.format('https://data.cityofboston.gov/', max_requests, offset, 'ABxNkGRBYxopAYInyPdP1hDRL')
	print(this_request)
	response = urllib.request.urlopen(this_request).read().decode('utf-8')
	r = json.loads(response)
	if len(r) == 0:
		break
	col.insert_many(r)
	offset += max_requests
	time.sleep(2)
