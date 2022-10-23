const schemas = {
    registerSchema: {
        type: Object,
        properties: {
            name: {
                type: 'string',
                example: 'Jan'
            },
            surname: {
                type: 'string',
                example: 'Kowalski'
            },
            email: {
                type: 'string',
                example: 'jan.kowalski@domain.com'
            },
            password: {
                type: 'string',
                example: '!VeryStrongPassword123'
            },
            captchaToken: {
                type: 'string',
                example: '_CAPTCHA_TOKEN_'
            },
        }
    },

    loginSchema: {
        type: Object,
        properties: {
            email: {
                type: 'string',
                example: 'jan.kowalski@domain.com'
            },
            password: {
                type: 'string',
                example: '!VeryStrongPassword123'
            }
        }
    },

    loggedSchema: {
        type: Object,
        properties: {
            token: {
                type: 'string',
                example: '_JWT_TOKEN_'
            }
        }
    },

    activateSchema: {
        type: Object,
        properties: {
            token: {
                type: 'string',
                example: '_ACTIVATE_TOKEN_'
            }
        }
    },

    user: {
        type: Object,
        properties: {
            name: {
                type: 'string',
                example: 'Jan'
            },
            surname: {
                type: 'string',
                example: 'Kowalski'
            },
            email: {
                type: 'string',
                example: 'jan.kowalski@domain.com'
            },
            active: {
                type: 'boolean',
                example: true
            },
            banned: {
                type: 'boolean',
                example: false
            },
            usersGroup: {
                type: 'objectId',
                example: '_GROUP_ID_'
            },
            points: {
                type: 'number',
                example: 0
            },
            _id: {
                type: 'objectId',
                example: '_OBJECT_ID_'
            }
        }
    },

    minifiedUser: {
        type: Object,
        properties: {
            name: {
                type: 'string',
                example: 'Jan'
            },
            surname: {
                type: 'string',
                example: 'Kowalski'
            },
            points: {
                type: 'number',
                example: 100
            },
            _id: {
                type: 'objectId',
                example: '_OBJECT_ID_'
            }
        }
    },

    postGroupSchema: {
        type: Object,
        properties: {
            title: {
                type: 'string',
                example: 'Osiedle kwiatowa'
            },
            loc: {
                type: Object,
                properties: {
                    lng: {
                        type: 'number',
                        example: 21.008171527406613
                    },
                    lat: {
                        type: 'number',
                        example: 52.23007481762713
                    }
                }
            }
        }

    },

    successfullyCreatedGroup: {
        type: Object,
        properties: {
            _id: {
                type: 'objectId',
                example: '_GROUP_ID_'
            }
        }
    },

    joinGroupSchema: {
        type: Object,
        properties: {
            groupId: {
                type: 'objectId',
                example: '_GROUP_ID_'
            }
        }
    }
}

export default schemas