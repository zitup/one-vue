import fetch from "../config/fetch";

export default {
    //获取最新onelist
    getOnelist: () => {
        return fetch("/channel/one/0/beijing", "GET")
            .then(res => {
                return res.json();
            })
    },
    //获取图片导航两个月数据
    getLTMdata: ltm => {
        return Promise.all(ltm.map(i => {
            return fetch('/feeds/list/' + i, 'GET')
                .then(res => {
                    return res.json()
                })
        }))
    },
    //获取上个月导航数据
    getLMData: (lastYear, lastMonth) => {
        return fetch('/feeds/list/' + lastYear + '-' + lastMonth, 'GET')
            .then(res => {
                return res.json()
            })
    },
    //获取某一天onelist
    getSomeoneList: date => {
        return fetch('/channel/one/' + date + '/0', 'GET')
            .then(res => {
                return res.json()
            })
    },
    //获取阅读内容及评论
    getEssay: item_id => {
        return Promise.all([fetch("/essay/" + item_id).then(
            res => {
                return res.json();
            }
        ), fetch("/comment/praiseandtime/essay/" + item_id + "/0").then(
            res => {
                return res.json();
            }
        )]);
    },
    //获取连载文章详情和评论
    getSerialcontent: item_id => {
        return Promise.all([fetch('/serialcontent/' + item_id).then(
            res => {
                return res.json();
            }
        ), fetch('/comment/praiseandtime/serial/' + item_id + '/0').then(
            res => {
                return res.json();
            }
        )])
    },
    //获取问答详情和评论
    getQuestion: item_id => {
        return Promise.all([fetch('/question/' + item_id).then(
            res => {
                return res.json();
            }
        ), fetch('/comment/praiseandtime/question/' + item_id + '/0').then(
            res => {
                return res.json();
            }
        )]);
    },
    //获取音乐详情和评论
    getMusic: item_id => {
        return Promise.all([fetch('/music/detail/' + item_id).then(
            res => {
                return res.json();
            }
        ), fetch('/comment/praiseandtime/music/' + item_id + '/0').then(
            res => {
                return res.json();
            }
        )]);
    },
    //获取影视详情和评论
    getMovie: item_id => {
        return Promise.all([fetch('/movie/' + item_id + '/story/1/0').then(
            res => {
                return res.json();
            }
        ), fetch('/comment/praiseandtime/movie/' + item_id + '/0').then(
            res => {
                return res.json();
            }
        )]);
    },
    //获取更多评论getMoreComment（基于上次评论最后一个评论ID）
    getMC: (category, item_id, comment_id) => {
        switch (category) {
            case 'Essay':
                return fetch('/comment/praiseandtime/essay/' + item_id + '/' + comment_id, 'GET')
                    .then(res => {
                        return res.json();
                    })
            case 'Serialcontent':
                return fetch('/comment/praiseandtime/serial/' + item_id + '/' + comment_id, 'GET')
                    .then(res => {
                        return res.json();
                    })
            case 'Question':
                return fetch('/comment/praiseandtime/question/' + item_id + '/' + comment_id, 'GET')
                    .then(res => {
                        return res.json();
                    })
            case 'Music':
                return fetch('/comment/praiseandtime/music/' + item_id + '/' + comment_id, 'GET')
                    .then(res => {
                        return res.json();
                    })
            case 'Movie':
                return fetch('/comment/praiseandtime/movie/' + item_id + '/' + comment_id, 'GET')
                    .then(res => {
                        return res.json();
                    })
        }
    },
};