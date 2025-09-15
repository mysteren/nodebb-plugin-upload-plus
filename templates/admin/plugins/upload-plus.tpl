<!-- templates/admin/plugins/upload-plus.tpl -->
<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 px-0 mb-4" tabindex="0">
			<form role="form" class="upload-plus-settings">
				<!-- Примечание о пересборке -->
				<div class="alert alert-info" role="alert">
					[[upload-plus:settings-apply-note]]
				</div>

				<div class="mb-4">
					<h5>[[upload-plus:section-paths]]</h5>
					<p class="text-muted">[[upload-plus:section-paths-description]]</p>
					<div class="mb-3">
						<label class="form-label" for="paths_type">[[upload-plus:path-structure-type]]</label>
						<select id="paths_type" name="paths_type" class="form-select">
							<option value="none">[[upload-plus:default]]</option>
							<option value="sha256_2">[[upload-plus:hash-level-2]]</option>
							<option value="sha256_3">[[upload-plus:hash-level-3]]</option>
							<option value="date">[[upload-plus:date]]</option>
						</select>
						<div class="form-text">
							<ul class="mb-0">
								<li><strong>[[upload-plus:default]]:</strong> [[upload-plus:default-desc]]</li>
								<li><strong>[[upload-plus:hash-level-2]]:</strong> [[upload-plus:hash-level-2-desc]]</li>
								<li><strong>[[upload-plus:hash-level-3]]:</strong> [[upload-plus:hash-level-3-desc]]</li>
								<li><strong>[[upload-plus:date]]:</strong> [[upload-plus:date-desc]]</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="mb-4">
					<h5>[[upload-plus:section-webp]]</h5>
					<p class="text-muted">[[upload-plus:section-webp-description]]</p>
					<div class="form-check mb-3">
						<input type="checkbox" class="form-check-input" id="convert_to_webp" name="convert_to_webp" />
						<label class="form-check-label" for="convert_to_webp">[[upload-plus:convert-images-to-webp]]</label>
						<div class="form-text">[[upload-plus:convert-images-to-webp-desc]]</div>
					</div>

					<div class="mb-3">
						<label class="form-label" for="webp_quality">[[upload-plus:webp-quality]]</label>
						<input type="number" class="form-control" id="webp_quality" name="webp_quality" min="1" max="100" value="80" />
						<div class="form-text">[[upload-plus:webp-quality-desc]]</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	
	<!-- IMPORT admin/partials/settings/footer.tpl -->
</div>