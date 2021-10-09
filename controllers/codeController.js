const Code = require('../models/code');

exports.getCode = async (req, res) => {
    const codeId = req.params.id;
    try {
        const code = await Code.find({codeId});

        return res.status(200).json({
            success: true,
            data: code
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Code: ${error.message}`
        })
    }
}
