const { get_base_url, get_jwt_token } = require('../services/zoom.service');
const rp = require('request-promise');

exports.user_info = async (req, res) => {
    const base_url = await get_base_url();
    const token = await get_jwt_token();

    const options = {
        uri: base_url + "/users/" + req.body.email,
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    return rp(options).then((response) => {
        return res.send({ ...response, token: token });
    }).catch(function (err) {
        return res.status(err.statusCode).send(err);
    });
}

exports.create_meeting = async (req, res) => {
    const base_url = await get_base_url();
    const { topic, start_time, duration, password } = req.body;
    const { authorization, user_id } = req.headers;

    let payload = {
        "topic": topic,
        "type": 1,
        "start_time": start_time,
        "duration": duration,
        // "schedule_for": "string",
        "timezone": "asia/kolkata",
        "password": password,
        // "agenda": "string",
        // "recurrence": {
        //   "type": 1,
        //   "repeat_interval": 0,
        //   "weekly_days": "string",
        //   "monthly_day": "integer",
        //   "monthly_week": "integer",
        //   "monthly_week_day": "integer",
        //   "end_times": "integer",
        //   "end_date_time": "string [date-time]"
        // },
        "settings": {
            "host_video": false,
            "participant_video": false,
            "cn_meeting": false,
            "in_meeting": false,
            "join_before_host": true,
            "mute_upon_entry": false,
            "watermark": false,
            "use_pmi": false,
            "approval_type": 2,
            "registration_type": 1,
            "audio": true,
            // "auto_recording": "string",
            "enforce_login": false,
            // "enforce_login_domains": "string",
            // "alternative_hosts": "string",
            //   "global_dial_in_countries": [
            //     "string"
            //   ],
            "registrants_email_notification": false
        }
    };
    const options = {
        method: 'POST',
        uri: base_url + "/users/" + user_id + "/meetings",
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': authorization.split(" ")[1]
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        body: payload,
        json: true //Parse the JSON string in the response
    };

    return rp(options).then((response) => {
        return res.send(response);
    }).catch(function (err) {
        return res.status(err.statusCode).send(err);
    });
}