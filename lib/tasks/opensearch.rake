namespace :opensearch do
  desc 'Typical indexing actions for search'
  task reindex: :environment do
    puts 'reindexing...'
    Rails.application.eager_load!
    index_models = SearchModel::SearchableModels.included_in
    index_models.each do |klass|
      IndexingJob.perform_now(klass)
    end
  end
end
