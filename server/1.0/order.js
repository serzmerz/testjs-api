const express = require('express');

const OrderModel = require('../models/order');
const TypeModel = require('../models/type');
const ProviderModel = require('../models/provider');

const expressJwt = require('express-jwt');
const CONSTANTS = require('../constants');
const SECRET = CONSTANTS.SECRET;
const authenticate = expressJwt({ secret: SECRET });

const orderRouter = new express.Router();

orderRouter
    .get('/', authenticate, function(req, res) {
        OrderModel.findAll({ where: { userId: req.user.id } }).then(data => {
            res.json({
                response: {
                    success: true,
                    data
                }
            });
        })
            .catch(err => {
                res.json({
                    response: {
                        success: false,
                        errors: err
                    }
                });
            });
    })
    .post('/type', function(req, res) {
        const type = req.body;

        TypeModel.create(type).then(items => {
            res.json({
                response: {
                    success: true,
                    items
                }
            });
        })
            .catch(err => {
                res.json({
                    response: {
                        success: false,
                        errors: err
                    }
                });
            });
    })
    .post('/provider', function(req, res) {
        const provider = req.body;

        ProviderModel.create(provider).then(items => {
            res.json({
                response: {
                    success: true,
                    items
                }
            });
        })
            .catch(err => {
                res.json({
                    response: {
                        success: false,
                        errors: err
                    }
                });
            });
    })
    .get('/data', function(req, res) {
        ProviderModel.findAll().then(data => {
            return TypeModel.findAll().then(items => {
                res.json({
                    response: {
                        success: true,
                        data: {
                            type: items,
                            provider: data
                        }
                    }
                });
            })
                .catch(err => {
                    res.json({
                        response: {
                            success: false,
                            errors: err
                        }
                    });
                });
        })
            .catch(err => {
                res.json({
                    response: {
                        success: false,
                        errors: err
                    }
                });
            });
    })
    .post('/', authenticate, function(req, res) {
        const order = req.body;

        order.userId = req.user.id;
        order.orderDate = Date.now();

        if (parseInt(order.orderDatePerformance) <= order.orderDate) {
            order.orderStatus = 'Expired';
        } else {
            order.orderStatus = 'Confirm';
        }

        OrderModel.findAll().then(data => {
            let countInMonth = 0;

            data.forEach(function(item) {
                const bufDate = new Date(parseInt(item.orderDate));

                if (bufDate.getMonth() === new Date().getMonth()) {
                    countInMonth++;
                }
            });

            const date = new Date();

            const year = date.getFullYear().toString().substring(2, 4);
            let month = date.getMonth() + 1;

            month = (month.toString().length === 1) ? '0' + month : month;
            let day = date.getDate();

            day = (day.toString().length === 1) ? '0' + day : day;

            const orderTypeFirst = order.orderType.toString().substring(0, 1).toLowerCase();

            order.orderNumber = String(
                orderTypeFirst + '-' + year +
                month +
                day + countInMonth);

            return OrderModel.create(order).then(items => {
                res.json({
                    response: {
                        success: true,
                        items
                    }
                });
            })
                .catch(err => {
                    res.json({
                        response: {
                            success: false,
                            errors: err
                        }
                    });
                });
        })
            .catch(err => {
                res.json({
                    response: {
                        success: false,
                        errors: err
                    }
                });
            });
    })
    .put('/', authenticate, function(req, res) {
        const order = req.body;

        OrderModel.update(order, { where: { id: order.id }, returning: true })
            .then(data => {
                res.json({
                    response: {
                        success: Boolean(Number(data[0])),
                        items: data[1].length === 0 ? 'No one row updated!' : data[1][0]
                    }
                });
            })
            .catch(err => {
                res.json({
                    response: {
                        success: false,
                        errors: err
                    }
                });
            });
    })
    .delete('/:id', authenticate, function(req, res) {
        OrderModel.destroy({ where: { id: req.params.id } })
            .then(data => {
                res.json({ response: { success: Boolean(Number(data)) } });
            })
            .catch(err => {
                res.json({ response: err });
            });
    })
;

module.exports = orderRouter;
