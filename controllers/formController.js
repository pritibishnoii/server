
const Form = require("../model/Form")


const saveForm = async (req, res) => {
    try {
        const { formname, folderId, theme, fields } = req.body;
        const userId = req.user.userId; // Assuming user ID is set in the auth middleware
        console.log("userid ", userId);

        const newForm = new Form({
            formname,
            userId,
            folderId,
            theme,
            views: 0,
            starts: 0,
            completionrate: 0,
            fields,
        });

        await newForm.save();
        res.status(201).json({ message: "Form saved successfully", form: newForm });
    } catch (error) {
        console.error("Error saving form:", error.message); // Log the error for debugging
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const fetchform = async (req, res) => {
    try {
        const { formId } = req.params;
        const form = await Form.findById(formId);
        if (form) {
            res.status(200).json({
                success: true,
                message: 'Form fetched successfully',
                form
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Form not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching form',
            error
        });
    }
}

const deleteform = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteform = await Form.findByIdAndDelete(id);
        if (!deleteform) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Form", error });
    }
}

const getFormByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const forms = await Form.find({ userId: userId });
        if (!forms) {
            return res.status(404).json({ message: 'Forms not found' });
        }
        res.status(200).json(forms);
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {saveForm,fetchform,deleteform,getFormByUser}