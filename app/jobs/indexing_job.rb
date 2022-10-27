class IndexingJob < ApplicationJob
  queue_as :default

  # Size of document batches to send to OpenSearch _bulk API
  # TODO: size up and down depending on duration
  BATCH_SIZE = 50

  def perform(model)
    @model = model

    delete_indices
    create_indices
    bulk_insert_records
  end

  def delete_indices
    # remove the index
    begin
      # INDEX_MODELS.each do |klass|
      #   # DELETE /indexname
      #   response = OpenSearchClient.indices.delete(
      #     index: klass.index_name
      #   )
      # end

      # HEAD /indexname
      if OpenSearchClient.indices.exists(index: @model.index_name)

        Rails.logger.info "Removing old indices..."

        # DELETE /indexname
        response = OpenSearchClient.indices.delete(
          index: @model.index_name
        )

        Rails.logger.info "Index removal of #{@model.name} Complete"
      end

    rescue => e
      # Usually a OpenSearch::Transport::Transport::Errors::NotFound exception
      Rails.logger.info e
    end
  end

  def create_indices
    Rails.logger.info "Creating indices..."
    begin
      # recreate the index
      # TODO: settings
      response = OpenSearchClient.indices.create(
        index: @model.index_name
      )
      Rails.logger.info "Index creation #{@model.name} Complete"
    rescue => e
      # Might be a "resource_already_exists_exception",
      # ex OpenSearch::Transport::Transport::Errors::BadRequest
      Rails.logger.warn e
    end
  end

  def bulk_insert_records
    Rails.logger.info "Indexing #{@model.name}..."
    batch_index(@model)
    Rails.logger.info "Indexing #{@model.name} Complete"
  end

  def batch_index(model)
    model.find_in_batches(batch_size: BATCH_SIZE).with_index do |group, batch|
      begin
        Rails.logger.info "Indexing group ##{batch}..."
        actions = group.map(&:index_action)
        # PUT /_bulk
        OpenSearchClient.bulk(body: actions, refresh: true)
      rescue => e
        Rails.logger.warn e
      end
    end
  end
end
