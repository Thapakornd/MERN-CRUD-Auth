const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        //console.log(req?.roles);
        const rolesArray = [...allowedRoles];

        if (!req?.roles) return res.status(400).send();
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(401).send();

        next();
    }
}

export default verifyRoles;