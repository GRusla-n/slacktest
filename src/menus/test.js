const cherio = require('cheerio')
const phantom = require('phantom');
const url = 'https://www.pizzaalcapone.cz/poledni-menu?id=0fda65605cdd11eca4000cc47a0ca484&do=chooseAlcBranch'

function getDishes($) {
    const dayIndex = new Date().getDay();
    const nodes = $(`div > h2:nth-child(${dayIndex + 1}) + p`);
    const nodes2 = $(`div > h2:nth-child(${dayIndex + 1}) + p + div`);

    const dishes = [{
        dish: {
            name: nodes[0].children[0].data.trim(),
            price: "",
        },
    }, {
        dish: {
            name: $(`div > h2:nth-child(${dayIndex + 1}) + p + div`)[0].children[1].children[0].data.trim(),
            price: $(`div > h2:nth-child(${dayIndex + 1}) + p + div`)[0].children[1].children[1].children[0].data,
        },
    }, {
        dish: {
            name: $(`div > h2:nth-child(${dayIndex + 1}) + p + div + div`)[0].children[1].children[0].data.trim(),
            price: $(`div > h2:nth-child(${dayIndex + 1}) + p + div + div`)[0].children[1].children[1].children[0].data,
        },
    }, {
        dish: {
            name: $(`div > h2:nth-child(${dayIndex + 1}) + p + div + div + div`)[0].children[1].children[0].data.trim(),
            price: $(`div > h2:nth-child(${dayIndex + 1}) + p + div + div + div`)[0].children[1].children[1].children[0].data,
        },
    }, {
        dish: {
            name: $(`div > h2:nth-child(${dayIndex + 1}) + p + div + div + div + div`)[0].children[1].children[0].data.trim(),
            price: $(`div > h2:nth-child(${dayIndex + 1}) + p + div + div + div + div`)[0].children[1].children[1].children[0].data,
        },
    },
    ];

    return dishes;
}

phantom.create().then(async function (ph) {
    ph.createPage().then(function (page) {
        page.open(url).then(async function (status) {
            const data = await page.cookies()

            ph.createPage().then(async function (page2) {
                await page2.addCookie(data)

                page2.open(url).then(async function (status) {
                    console.log('status', status)

                    const content = await page2.property('content');

                    console.log('test', getDishes(cherio.load(content)))

                    process.exit()
                })
            })
        });
    });
});
