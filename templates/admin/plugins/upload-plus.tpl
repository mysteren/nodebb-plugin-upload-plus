<div class="row">
  <div class="col-sm-2 col-xs-12">
    <h5>[[smart-upload:admin.title]]</h5>
  </div>
  <div class="col-sm-10 col-xs-12">
    <form>
      <div class="form-group">
        <label>[[smart-upload:admin.paths_type]]</label>
        <select class="form-control" data-field="paths_type">
          <option value="hash">[[smart-upload:admin.paths_type_hash]]</option>
          <option value="date">[[smart-upload:admin.paths_type_date]]</option>
        </select>
      </div>

      <div class="checkbox">
        <label>
          <input type="checkbox" data-field="convert_to_webp" />
          [[smart-upload:admin.convert_to_webp]]
        </label>
      </div>

      <button class="btn btn-primary" type="button" id="save">
        [[smart-upload:admin.save]]
      </button>
    </form>
  </div>
</div>