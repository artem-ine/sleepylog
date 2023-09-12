echo "running $0"

cd ..

# Precompile assets for the Rails backend
bundle install
# bundle exec rake assets:precompile

# Start the Rails server
bundle exec rails server -p $RAILS_PORT
