import React from 'react';

export default (err, notifSystem, level = 'warning') => {


    if (err.response) {

        if (err.response.headers['x-access-token'] && err.response.headers['x-refresh-token']) {
            console.log('renew');
            localStorage.setItem('accessToken', err.response.headers['x-access-token']);
            localStorage.setItem('refreshToken', err.response.headers['x-refresh-token']);
        }

        if (err.response.data) {
            if (err.response.data.errors) {
                if (Array.isArray(err.response.data.errors)) {
                    return err.response.data.errors.forEach((error) => {
                        notifSystem.addNotification({
                            message: (
                                <div>
                                    {error.msg}
                                </div>
                            ),
                            level: level,
                            position: 'tr',
                            autoDismiss: 15
                        });
                    });
                }
            }
        }
    }

    notifSystem.addNotification({
        message: (
            <div>
                {err.message || err.toString()}
            </div>
        ),
        level: level,
        position: 'tr',
        autoDismiss: 15
    });

}