const express = require('express');

const orderProvider = [
    {
        id: 1,
        name: 'Chocolate'
    },
    {
        id: 2,
        name: 'Some Provider'
    },
    {
        id: 2,
        name: 'Hollywood undead'
    }
];

const orderType = [
    {
        id: 1,
        name: 'Wholesale'
    },
    {
        id: 2,
        name: 'Retail'
    }
];

let orderData = [
    {
        id:	1,
        customerFistName:	'Some',
        customerSecondName:	'Name',
        customerEmail:	'serzmerz@gmail.com',
        customerPhone:	'+380508745114',
        orderTranscription:	'First Order',
        orderType:	'Wholesale',
        orderProvider:	'Chocolate',
        orderDatePerformance:	1503435600000,
        orderDate:	1503003028244,
        orderStatus:	'Confirm',
        orderNumber:	'w-1708171'
    }
];

const orderRouter = new express.Router();

orderRouter
    .get('/', function(req, res) {
        res.json({
            response: {
                success: true,
                data: orderData
            }
        });
    })
    .get('/data', function(req, res) {
        res.json({
            response: {
                success: true,
                data: {
                    type: orderType,
                    provider: orderProvider
                }
            }
        });
    })
    .post('/type', function(req, res) {
        const type = req.body;

        type.id = orderType.length + 1;
        orderType.push(type);
        res.json({
            response: {
                success: true,
                items: type
            }
        });
    })
    .post('/provider', function(req, res) {
        const provider = req.body;

        provider.id = orderProvider.length + 1;
        orderProvider.push(provider);
        res.json({
            response: {
                success: true,
                items: provider
            }
        });
    })
    .post('/', function(req, res) {
        const order = req.body;

        order.id = orderData.length + 1;
        order.orderDate = Date.now();

        if (parseInt(order.orderDatePerformance) <= order.orderDate) {
            order.orderStatus = 'Expired';
        } else {
            order.orderStatus = 'Confirm';
        }

        let countInMonth = 0;

        orderData.forEach(function(item) {
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

        orderData.push(order);
        res.json({
            response: {
                success: true,
                items: order
            }
        });
    })
    .put('/', function(req, res) {
        const order = req.body;

        orderData = orderData.map(function(item) {
            if (item.id === order.id) {
                return item = order;
            }
            return item;
        });
        res.json({
            response: {
                success: true,
                items: order
            }
        });
    })
;

module.exports = orderRouter;
