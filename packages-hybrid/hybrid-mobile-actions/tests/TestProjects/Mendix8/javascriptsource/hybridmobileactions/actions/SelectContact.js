// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// BEGIN EXTRA CODE
// END EXTRA CODE
/**
 * @returns {MxObject}
 */
export async function SelectContact() {
    // BEGIN USER CODE
    // Documentation: https://github.com/apache/cordova-plugin-contacts
    return new Promise((resolve, reject) => {
        if (!navigator.contacts) {
            return reject(
                new Error("SelectContact action requires cordova-plugin-contacts to be installed in the app")
            );
        }
        navigator.contacts.pickContact(
            contact => {
                createMxObject(contact)
                    .then(object => resolve(object))
                    .catch(error => reject(error));
            },
            error => (error.code === 6 /* OPERATION_CANCELLED_ERROR */ ? resolve() : reject(errorMessage(error)))
        );
    });
    function createMxObject(contact) {
        return new Promise((resolve, reject) => {
            mx.data.create({
                entity: "HybridMobileActions.Contact",
                callback: mxObject => {
                    mxObject.set("ContactID", contact.id);
                    const name = contact.displayName || contact.nickname || (contact.name && contact.name.formatted);
                    if (name) {
                        mxObject.set("DisplayName", name);
                    }
                    if (contact.name && contact.name.givenName) {
                        mxObject.set("FirstName", contact.name.givenName);
                    }
                    if (contact.name && contact.name.middleName) {
                        mxObject.set("MiddleName", contact.name.middleName);
                    }
                    if (contact.name && contact.name.familyName) {
                        mxObject.set("LastName", contact.name.familyName);
                    }
                    const email = contact.emails && contact.emails[0].value;
                    if (email) {
                        mxObject.set("Email", email);
                    }
                    const phoneNumber = contact.phoneNumbers && contact.phoneNumbers[0].value;
                    if (phoneNumber) {
                        mxObject.set("PhoneNumber", phoneNumber);
                    }
                    resolve(mxObject);
                },
                error: () => reject(new Error("Could not create 'HybridMobileActions.Contact' object"))
            });
        });
    }
    function errorMessage(error) {
        switch (error.code) {
            case 0 /* UNKNOWN_ERROR */:
                return "Found an unknown error while handling the request.";
            case 1 /* INVALID_ARGUMENT_ERROR */:
                return "Invalid argument found.";
            case 2 /* TIMEOUT_ERROR */:
                return "Operation timed out.";
            case 3 /* PENDING_OPERATION_ERROR */:
                return "Pending operation error.";
            case 4 /* IO_ERROR */:
                return "IO error encountered.";
            case 5 /* NOT_SUPPORTED_ERROR */:
                return "Operation not supported.";
            case 20 /* PERMISSION_DENIED_ERROR */:
                return "Permission denied.";
        }
        return "Error code undefined";
    }
    // END USER CODE
}
