export class EstablishmentController {
  constructor({ establishmentModel }) {
    this.establishmentModel = establishmentModel;
  }
  getAll = async (req, res) => {
    const establishments = await this.establishmentModel.getAll();

    if (!establishments)
      return res.status(400).send({ error: "No existen establecimientos" });

    res.status(200).send(establishments);
  };
  getOne = async (req, res) => {
    const { establishment_id } = req.params;

    if (!establishment_id)
      return res.status(400).send({ error: "Campos obligatorios" });

    const establishment = await this.establishmentModel.getOne({
      establishment_id,
    });

    if (!establishment)
      return res.status(400).send({ error: "No existe establecimiento" });

    res.status(200).send(establishment);
  };
}
