require 'opensearch'

# If you want to use authentication credentials
OpenSearchClient = OpenSearch::Client.new(
  host: ENV.fetch("BONSAI_URL") { "redis://localhost:9200" },    # For testing only. Don't store credentials in code.
  transport_options: { ssl: { verify: false } }  # For testing only. Use certificate for validation.
)
