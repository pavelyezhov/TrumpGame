class CatImgSettings {
    constructor() {

    }

    static getRightSettings() {
        return [
            {
                sx: 0,
                sy: 64,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 32,
                sy: 64,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 64,
                sy: 64,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 96,
                sy: 64,
                sWidth: 32,
                sHeight: 32
            }
        ];
    }

    static getLeftSettings() {
        return [
            {
                sx: 0,
                sy: 32,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 32,
                sy: 32,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 64,
                sy: 32,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 96,
                sy: 32,
                sWidth: 32,
                sHeight: 32
            }
        ];
    }

    static getDownSettings() {
        return [
            {
                sx: 0,
                sy: 0,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 32,
                sy: 0,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 64,
                sy: 0,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 96,
                sy: 0,
                sWidth: 32,
                sHeight: 32
            }
        ];
    }

    static getUpSettings() {
        return [
            {
                sx: 0,
                sy: 96,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 32,
                sy: 96,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 64,
                sy: 96,
                sWidth: 32,
                sHeight: 32
            },
            {
                sx: 96,
                sy: 96,
                sWidth: 32,
                sHeight: 32
            }
        ];
    }

}
export default CatImgSettings;