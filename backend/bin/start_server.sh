echo "running $0"

cd $(dirname $0)
cd ..
echo "running in $(pwd)"
echo "$(ip addr show)"

bundle install


# Start the Rails server
rails_port="${1:-3000}"
bundle exec rails server -p $rails_port
