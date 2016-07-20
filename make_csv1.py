import pymongo

client = pymongo.MongoClient()
db = client.test
data = db.formattedtime

entries = data.find()

values_to_enter = ['ward', 'source', 'date_diff', 'case_status']
with open('wardsource.csv', 'w') as f:
	headers = values_to_enter
	for h in headers:
		f.write('{},'.format(h))
	f.write('\n')
	for e in entries:
		for k in values_to_enter:
			f.write('{},'.format(e[k]))
		f.write('\n')
	f.close()