source 'https://rubygems.org'
ruby '3.0.2'

gem 'sinatra', '3.0.2'               # Web framework
gem 'puma'                           # Web server

gem 'activerecord', '7.0.4'          # Object-relational mapper
gem 'pg', '~> 1.4.4'                 # PostgreSQL gem
gem 'sinatra-activerecord', '2.0.26' # Sinatra setup for AR

gem 'prius', '~> 5.0'                # Environment variable management
gem 'rake', '~> 13.0'                # Task manager

gem 'spot-gps', '~> 0.3.1'           # Client library for SPOT GPS tracker
gem 'exifr', '~> 1.3.10'             # Read image metadata, including GPS data
gem 'google-api-client', '~> 0.53.0' # Pull images from Google Drive
gem 'fog-aws', '~> 0.9.4'            # Push images up to S3

gem 'mini_magick'                    # Image manipulation (re-orienting for S3)

group :development, :test do
  gem 'pry'                          # Debugging console

  gem 'dotenv', require: false       # Local environment variables
  gem 'shotgun'                      # Auto-reloading web server

  gem 'fog-local', '~> 0.8.0'        # Local file storage for Fog
end

group :test do
  gem 'rspec', '~> 3.12'             # Testing framework
  gem 'rspec-its'                    # Allows `its(:method) { ... }`
  gem 'rack-test'                    # Testing Sinatra

  gem 'webmock', '~> 3.18.1'         # Mocking API calls

  gem 'factory_bot'                  # Quickly instantiate models

  gem 'database_cleaner'             # Clean up database after each run
end
