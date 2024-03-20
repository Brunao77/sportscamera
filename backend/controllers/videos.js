export class VideosController {
  constructor({ videosModel, userModel, cameraModel }) {
    this.videosModel = videosModel;
    this.userModel = userModel;
    this.cameraModel = cameraModel;
  }

  getAll = async (req, res) => {
    //GET ALL USER VIDEOS
    const { user_id } = req;

    const { establishment_id } = await this.userModel.profile({
      user_id,
    });

    if (!establishment_id)
      return res
        .status(400)
        .send({ error: "No hay establecimientos relacionados" });

    const cameras = await this.cameraModel.getAll({
      establishment_id,
    });

    const videos = await Promise.all(
      cameras.map(async ({ camera_id }) => {
        return await this.videosModel.getAll({ camera_id });
      })
    );

    if (!videos) return res.status(400).send({ error: "No hay videos" });

    return res
      .status(200)
      .send({ message: "Videos con exito", videos: videos.flat() });
  };

  getVideoTurns = async (req, res) => {
    // GET ALL VIDEOS ACCORDING TO DATE AND FIELD
    const { camera_id, date } = req.params;

    const videos = await this.videosModel.getVideoTurns({
      camera_id,
      date,
    });

    if (!videos)
      return res
        .status(404)
        .send({ error: "No existen videos para esa cancha y ese dia" });

    res.status(200).send(videos);
  };

  delete = async (req, res) => {
    // DELETE VIDEO
    const { video_id } = req.body;

    if (!video_id)
      return res.status(404).send({ error: "Campos obligatorios" });

    const result = await this.videosModel.delete({ video_id });

    res.status(200).json(result);
  };

  create = async (req, res) => {
    // CREATE NEW VIDEO
    const { date, start_time, end_time, name, video_url, camera_id } = req.body;

    if (!date || !start_time || !end_time || !name || !video_url || !camera_id)
      return res.status(404).send({ error: "Todos los campos son requeridos" });

    const videoInTurn = await this.videosModel.existVideoTurn({
      date,
      start_time,
      end_time,
      camera_id,
    });

    if (videoInTurn)
      return res
        .status(404)
        .send({ error: "Ya existe video en esa cancha con ese turno" });

    const result = await this.videosModel.create({
      date,
      start_time,
      end_time,
      name,
      video_url,
      camera_id,
    });

    if (!result) return res.status(404).send({ error: "No se creo el video" });

    return res.status(200).send({ message: "Video creado con exito" });
  };

  update = async (req, res) => {
    const { video_id, name, camera_id, date, start_time, end_time } = req.body;
    const result = await this.videosModel.update({
      video_id,
      name,
      camera_id,
      date,
      start_time,
      end_time,
    });
    res.status(200).json(result);
  };
}

/*getOne = async (req, res) => {
    //GET ONE VIDEO
    const { establishment_id } = req.params;
    const { field_name, date, start_time, end_time } = req.body;

    const { camera_id } = await this.cameraModel.getByName({
      establishment_id,
      field_name,
    });

    if (!camera_id) return res.status(404).send({ error: "No existe video" });

    const video = await this.videosModel.getOne({
      date,
      start_time,
      end_time,
      camera_id,
    });

    if (!video) return res.status(404).send({ error: "No existe video" });

    res.status(200).send({ message: "Video encontrado", video });
  };*/
