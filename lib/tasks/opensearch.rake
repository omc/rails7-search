namespace :opensearch do
  task reindex: :environment do
    # remove the index
    # TODO: do a head request to check for the index first
    # DELETE
    response = OpenSearchClient.indices.delete(
      index: 'books'
    )

    # recreate the index
    # TODO: settings
    # TODO: programmatically remove and create indices
    # PUT
    response = OpenSearchClient.indices.create(
      index: 'books'
    )

    actions = []
    Book.in_batches.each_record do |book|
      actions<< book.index_action
    end

    # PUT _bulk
    OpenSearchClient.bulk(body: actions, refresh: true)
  end
end
