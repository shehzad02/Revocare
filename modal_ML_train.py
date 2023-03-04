import modal

stub = modal.Stub("gpu_powa")

image = modal.Image.debian_slim().pip_install("pandas")


@stub.function(gpu=modal.gpu.A100(memory=20))
def my_function():
    print("hello world")
