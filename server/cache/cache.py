from flask_caching import Cache

instance = Cache(config={'CACHE_TYPE': 'simple'})
