export class CameraController {
  constructor({ cameraModel }) {
    this.cameraModel = cameraModel;
  }
  getAll = async (req, res) => {
    const { establishment_id } = req.params;

    if (!establishment_id)
      return res.status(400).send({ error: "Campos obligatorios" });

    const cameras = await this.cameraModel.getAll({
      establishment_id,
    });

    if (!cameras) return res.status(400).send({ error: "No existen camaras" });

    res.status(200).send(cameras);
  };
  getByName = async (req, res) => {
    const { establishment_id } = req.params;

    if (!establishment_id)
      return res.status(400).send({ error: "Campos obligatorios" });

    const cameras = await this.cameraModel.getAll({
      establishment_id,
    });

    if (!cameras) return res.status(400).send({ error: "No existen camaras" });

    res.status(200).send(cameras);
  };
}
