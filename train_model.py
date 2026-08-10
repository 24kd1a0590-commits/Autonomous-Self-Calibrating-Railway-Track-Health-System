from ultralytics import YOLO

# Load YOLOv11 nano model
model = YOLO("yolo11n.pt")

# Train
model.train(
    data="datasets/railway_dataset/data.yaml",
    epochs=50,
    imgsz=640,
    batch=8,
    project="models",
    name="railway_crack_detector"
)