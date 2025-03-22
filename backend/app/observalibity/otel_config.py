import logging
from opentelemetry import trace, metrics
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.instrumentation.logging import LoggingInstrumentor
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter

from opentelemetry._logs import set_logger_provider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
#  from opentelemetry.sdk._logs.export import ConsoleLogExporter
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.sdk._logs import LoggingHandler



# Importaciones para el módulo de logs en la versión 1.24.0
from opentelemetry.sdk import _logs
from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter

def setup_otel(app, collector_endpoint="http://otel-collector:4317"):
    """
    Configura OpenTelemetry con trazas, métricas y logs para una aplicación FastAPI.
    
    Args:
        app: La aplicación FastAPI a instrumentar
        collector_endpoint: Endpoint del colector OpenTelemetry (por defecto: http://otel-collector:4317)
    
    Returns:
        dict: Diccionario con los proveedores configurados
    """
    # Configurar proveedor de trazas
    trace_provider = TracerProvider()
    trace.set_tracer_provider(trace_provider)
    span_exporter = OTLPSpanExporter(endpoint=collector_endpoint, insecure=True)
    span_processor = BatchSpanProcessor(span_exporter)
    trace_provider.add_span_processor(span_processor)

    # Configurar proveedor de métricas
    meter_provider = MeterProvider(
        metric_readers=[PeriodicExportingMetricReader(OTLPMetricExporter(endpoint=collector_endpoint, insecure=True))]
    )
    metrics.set_meter_provider(meter_provider)

    logger_provider = LoggerProvider()  
    set_logger_provider(logger_provider)
    logging.getLogger().setLevel(logging.DEBUG)

    exporter = OTLPLogExporter(insecure=True)
    logger_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
    handler = LoggingHandler(level=logging.INFO, logger_provider=logger_provider)

    # Attach OTLP handler to root logger
    logging.getLogger().addHandler(handler)
    # Instrumentar logging
    #LoggingInstrumentor().instrument(logger_provider=logger_provider)
    LoggingInstrumentor().instrument(set_logging_format=True)
    

    # Instrumentar FastAPI y requests
    FastAPIInstrumentor.instrument_app(app)
    RequestsInstrumentor().instrument()
    
    return {
        "trace_provider": trace_provider,
        "meter_provider": meter_provider,
        "logger_provider": logger_provider
    }