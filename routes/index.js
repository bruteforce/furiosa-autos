var express = require('express');
var router = express.Router();
var api = require('../lib/api');
var data_manipulation_helper = require('../helpers/data_helper');
var sort_constants = require('../constants/sort_constants');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*
* Task 1:
* Make models alphabetically sortable (ascending, descending, default)
*/
router.get('/models', function(req, res, next) {
	// use api to get models and render output
	return api.fetchModels()
		.then(function(models) {
            var sortby = req.query.sortby || '';
            var action = req.query.action || '';
			if(action!== '' && sortby!=='') {
				models = data_manipulation_helper.sortArray(models, sortby);
			}
			res.render('models', {models: models,sort_options: sort_constants.alphabeticalSort,sortby: sortby});
		});
});

/*
* Task 2:
* Make services filterable by type (repair, maintenance, cosmetic)
*/
router.get('/services', function(req, res, next) {
	// use api to get services and render output
	return api.fetchServices()
		.then(function(services) {
            var sortby = req.query.sortby || '';
            var action = req.query.action || '';
			if(action!== '' && sortby!=='') {
				services = data_manipulation_helper.filterArrayOfObjectsOnKey(services, 'type', sortby);
			}
			res.render('services', {services: services,sort_options: sort_constants.serviceTypeSort,sortby: sortby} );
		});
});
/*
* Task 3:
* Bugfix: Something prevents reviews from being rendered
* Make reviews searchable (content and source)
*/

router.get('/reviews', function(req, res, next) {
	return Promise.all([api.fetchCustomerReviews(), api.fetchCorporateReviews()])
		.then(function(reviews) {
			var keyword = req.query.keyword || '';
			reviews = data_manipulation_helper.flattenArray(reviews);
			if(keyword !== '') {
				reviews = data_manipulation_helper.filterArrayOfObjects(reviews, keyword);
			}
			res.render('reviews', {reviews: reviews, searchKeyword:keyword});
		});
});

module.exports = router;
